#!/usr/bin/env python3
"""Evidence-gated workflow state helper. Not an autonomous agent runner."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATE = ROOT / ".workflow/state.json"
STAGES = ["discovery", "ux", "architecture", "implementation", "qa", "release"]
STATUSES = {"pending", "in_progress", "waiting_approval", "completed", "not_applicable", "blocked"}
APPROVAL_STAGES = {"discovery", "ux", "architecture", "release"}

def load():
    data = json.loads(STATE.read_text(encoding="utf-8"))
    assert data["version"] == 1
    assert set(data["stages"]) == set(STAGES)
    assert all(status in STATUSES for status in data["stages"].values())
    assert isinstance(data.get("evidence"), dict)
    return data

def validate():
    data = load()
    for index, stage in enumerate(STAGES):
        status = data["stages"][stage]
        if status in ("completed", "not_applicable"):
            assert data["evidence"].get(stage), f"{stage} missing evidence"
        if status in ("completed", "in_progress", "waiting_approval"):
            assert all(data["stages"][prior] in ("completed", "not_applicable") for prior in STAGES[:index]), f"{stage} prerequisites incomplete"
        if status == "completed" and stage in APPROVAL_STAGES:
            assert "approved:" in data["evidence"].get(stage, "").lower(), f"{stage} missing approval evidence"
    for name in ("AGENTS.md", "docs/ACCEPTANCE.md", ".workflow/config.json"):
        assert (ROOT / name).exists(), f"Missing {name}"
    print("Workflow validation passed")

def transition(stage, status, evidence=None):
    assert stage in STAGES and status in STATUSES, "Invalid stage or status"
    data = load()
    index = STAGES.index(stage)
    assert all(data["stages"][prior] in ("completed", "not_applicable") for prior in STAGES[:index]), "Prerequisites incomplete"
    previous = data["stages"][stage]
    assert previous not in ("completed", "not_applicable") or previous == status, "Cannot silently rewrite finalized stage"
    if status in ("completed", "not_applicable"):
        assert evidence and evidence.strip(), "Evidence or not-applicable rationale required"
        if status == "completed" and stage in APPROVAL_STAGES:
            assert "approved:" in evidence.lower(), "Approval evidence required"
        data["evidence"][stage] = evidence.strip()
    data["stages"][stage] = status
    temporary = STATE.with_suffix(".tmp")
    temporary.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    temporary.replace(STATE)
    validate()

if __name__ == "__main__":
    try:
        command = sys.argv[1] if len(sys.argv) > 1 else "status"
        if command == "status":
            print(json.dumps(load(), indent=2))
        elif command == "validate":
            validate()
        elif command == "transition":
            transition(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else None)
        else:
            raise ValueError("Usage: status | validate | transition <stage> <status> [evidence]")
    except (AssertionError, ValueError, IndexError, KeyError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)
