import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

from scripts import workflow

class WorkflowTests(unittest.TestCase):
    def setUp(self):
        temp_dir = TemporaryDirectory(prefix="workflow-test-")
        self.addCleanup(temp_dir.cleanup)
        root = Path(temp_dir.name)
        (root / ".workflow").mkdir()
        (root / "docs").mkdir()
        (root / "AGENTS.md").write_text("# Test fixture\n", encoding="utf-8")
        (root / "docs/ACCEPTANCE.md").write_text("# Test fixture\n", encoding="utf-8")
        (root / ".workflow/config.json").write_text("{}\n", encoding="utf-8")
        state_path = root / ".workflow/state.json"
        state_path.write_text(json.dumps({
            "version": 1,
            "project_name": "test-project",
            "stages": {stage: "pending" for stage in workflow.STAGES},
            "evidence": {},
            "decisions": [],
        }), encoding="utf-8")
        for name, value in (("ROOT", root), ("STATE", state_path)):
            patcher = patch.object(workflow, name, value)
            patcher.start()
            self.addCleanup(patcher.stop)

    def test_stages(self):
        self.assertEqual(len(workflow.STAGES), 6)

    def test_default_state(self):
        data = workflow.load()
        self.assertEqual(data["stages"]["discovery"], "pending")

    def test_validate(self):
        workflow.validate()

    def test_validate_rejects_missing_evidence(self):
        data = workflow.load()
        data["stages"]["discovery"] = "completed"
        workflow.STATE.write_text(json.dumps(data), encoding="utf-8")
        with self.assertRaisesRegex(AssertionError, "discovery missing evidence"):
            workflow.validate()

    def test_ux_approval_required(self):
        self.assertIn("ux", workflow.APPROVAL_STAGES)

if __name__ == "__main__":
    unittest.main()
