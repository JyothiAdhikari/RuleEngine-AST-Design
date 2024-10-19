class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type; // "operator" or "operand"
        this.value = value; // Condition or operator (AND/OR)
        this.left = left; // Left child node
        this.right = right; // Right child node
    }
}

const operators = ['AND', 'OR'];
const comparisonOperators = ['>', '<', '>=', '<=', '=', '!='];

function create_rule(rule_string) {
    const tokens = rule_string.split(' ').filter(Boolean);
    const nodeStack = [];

    function createOperandNode(tokens) {
        const [field, operator, value] = tokens;
        console.log(`Creating operand node: Field = ${field}, Operator = ${operator}, Value = ${value}`);
        return new Node('operand', { field, operator, value });
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].toUpperCase();

        if (operators.includes(token)) {
            const rightNode = nodeStack.pop();
            const leftNode = nodeStack.pop();
            const operatorNode = new Node('operator', token, leftNode, rightNode);
            console.log(`Creating operator node: Operator = ${token}`);
            nodeStack.push(operatorNode);
        } else if (comparisonOperators.some(op => tokens[i + 1] === op)) {
            const operandNode = createOperandNode(tokens.slice(i, i + 3));
            nodeStack.push(operandNode);
            i += 2;
        }
    }

    const resultAST = nodeStack.pop();
    console.log('Generated AST:', JSON.stringify(resultAST, null, 2));
    return resultAST;
}

function combine_rules(rules, operator = 'AND') {
    if (rules.length === 1) return rules[0];
    
    let combinedRoot = rules[0];
    
    for (let i = 1; i < rules.length; i++) {
        combinedRoot = new Node('operator', operator, combinedRoot, rules[i]);
    }

    console.log('Combined AST:', JSON.stringify(combinedRoot, null, 2));
    return combinedRoot;
}

function evaluate_rule(ast, data) {
    console.log('Evaluating AST:', JSON.stringify(ast, null, 2));
    if (ast.type === 'operator') {
        const leftResult = evaluate_rule(ast.left, data);
        const rightResult = evaluate_rule(ast.right, data);

        if (ast.value === 'AND') return leftResult && rightResult;
        if (ast.value === 'OR') return leftResult || rightResult;
    } else if (ast.type === 'operand') {
        const { field, operator, value } = ast.value;
        const fieldValue = data[field];

        switch (operator) {
            case '>': return fieldValue > value;
            case '<': return fieldValue < value;
            case '>=': return fieldValue >= value;
            case '<=': return fieldValue <= value;
            case '=': return fieldValue == value;
            case '!=': return fieldValue != value;
            default: return false;
        }
    }
}

// Sample test cases
const rule1 = "age > 30 AND department = 'Sales'";
const rule2 = "age < 25 AND department = 'Marketing'";
const rule3 = "salary > 50000 OR experience > 5";

const ast1 = create_rule(rule1);
const ast2 = create_rule(rule2);
const ast3 = create_rule(rule3);

const combinedAST = combine_rules([ast1, ast2, ast3], 'AND');

const userData = {
    age: 35,
    department: 'Sales',
    salary: 60000,
    experience: 3
};

const result = evaluate_rule(combinedAST, userData);
console.log('Final result:', result); // Should return true or false based on the rule
