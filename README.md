## Rule Engine with Abstract Syntax Tree (AST) for Dynamic Filtering

### Description:
This repository implements a dynamic rule engine using an Abstract Syntax Tree (AST) structure. The rule engine processes and evaluates complex filter conditions for data querying, using operands (such as field, operator, and value) and logical operators (AND, OR). 

The engine supports dynamic rule creation and evaluates the rules based on an input dataset. It breaks down conditions into operand and operator nodes, constructs an AST, and then evaluates the tree to return the final result.

### Features:
- **Dynamic Rule Creation:** Parse rules in the form of operands and operators.
- **AST Construction:** Build an Abstract Syntax Tree for logical rule evaluation.
- **Operand Evaluation:** Evaluate rules with conditions like `field > value` or `field = value`.
- **Support for Logical Operators:** Combine multiple conditions using `AND`, `OR`.
- **Logging:** Track each step of AST construction and rule evaluation through detailed logs.
- **Easy Extension:** Add more operators or modify the structure of rules with ease.

### Example Use Case:
- **Filters for Employee Data**: You can filter employee data with rules like:
  - `age > 30 AND department = 'Sales'`
  - `salary > 50000 OR experience > 5`

### How It Works:
1. **Create Operand Nodes**: Each condition (`field`, `operator`, `value`) forms an operand node.
2. **Create Operator Nodes**: Logical operators like AND or OR connect operand nodes.
3. **Build AST**: These nodes are combined to form an AST representing the logic of the rule.
4. **Evaluate AST**: The tree is traversed and evaluated to determine if the rule matches the data.

### To Run:
Run the rule engine with a sample dataset using:
   ```bash
   node ruleEngine.js
   ```
