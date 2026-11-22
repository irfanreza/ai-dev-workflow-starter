import unittest
from scripts import workflow

class WorkflowTests(unittest.TestCase):
    def test_stages(self):
        self.assertEqual(len(workflow.STAGES), 6)

    def test_default_state(self):
        data = workflow.load()
        self.assertEqual(data["stages"]["discovery"], "pending")

    def test_validate(self):
        workflow.validate()

    def test_ux_approval_required(self):
        self.assertIn("ux", workflow.APPROVAL_STAGES)

if __name__ == "__main__":
    unittest.main()
