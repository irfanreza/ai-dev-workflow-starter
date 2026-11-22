#!/usr/bin/env bash
# Local-only review runner. Never publishes artifacts or installs agent hooks.
set -euo pipefail
cd "$(dirname "$0")/.."
export LAVISH_AXI_TELEMETRY=0
export LAVISH_AXI_HOST=127.0.0.1
export LAVISH_AXI_PORT=57123
export LAVISH_AXI_STATE_DIR="$PWD/.workflow/lavish"
export LAVISH_AXI_NO_OPEN=1
exec node .workflow/tools/lavish/node_modules/lavish-axi/dist/cli.mjs "$@"
