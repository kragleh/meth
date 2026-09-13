import { randomInt } from "./Random";

export type MathOperator = "+" | "-" | "*" | "/";

// Represents a single step attached after the initial number
export interface EquationTerm {
  id: string;
  operator: MathOperator;
  value: number;
}

// Represents the full equation state
export interface Equation {
  id: string;
  initialValue: number;
  terms: EquationTerm[];
  targetResult: number;
}

export const equationToString = (equation: Equation): string => {
  let str = ''

  str += equation.initialValue

  equation.terms.map(v => {
    str += ' ' + v.operator + ' ' + v.value
  })

  return str
}

export const generateEquation = (
  termCount: number = 2, 
  enabledOperations: string[] = ['+', '-', '*', '/'],
  randomLength: boolean = true
): Equation => {
  if (randomLength) {
    termCount = randomInt(1, termCount)
  }

  // Fallback to '+' if enabledOperations is empty
  const availableOperators = enabledOperations.length > 0 
    ? (enabledOperations as MathOperator[])
    : (["+"] as MathOperator[])
  
  const cleanDivisors = [1, 2, 4, 5, 10]

  const initialValue = randomInt(1, 10)
  const terms: EquationTerm[] = []

  for (let i = 0; i < termCount; i++) {
    const randomOp = availableOperators[Math.floor(Math.random() * availableOperators.length)]
    
    // Pick from clean denominators if dividing, otherwise standard 1-10 range
    const randomVal = randomOp === "/"
      ? cleanDivisors[Math.floor(Math.random() * cleanDivisors.length)]
      : randomInt(1, 10)

    terms.push({
      id: `term-${i}-${Date.now()}`,
      operator: randomOp,
      value: randomVal,
    })
  }

  const draftEquation: Equation = {
    id: `eq-${Date.now()}`,
    initialValue,
    terms,
    targetResult: 0,
  }

  // Calculate target result using evaluation logic
  draftEquation.targetResult = evaluateEquation(draftEquation)

  return draftEquation
}

const OPERATOR_PRECEDENCE: Record<MathOperator, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
}

const applyOperator = (a: number, b: number, op: MathOperator): number => {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : 0;
  }
}

export const evaluateEquation = (eq: Equation): number => {
  const values: number[] = [eq.initialValue]
  const operators: MathOperator[] = []

  for (const term of eq.terms) {
    const currentOp = term.operator

    // While top operator on stack has higher/equal precedence, evaluate it first
    while (
      operators.length > 0 &&
      OPERATOR_PRECEDENCE[operators[operators.length - 1]] >= OPERATOR_PRECEDENCE[currentOp]
    ) {
      const op = operators.pop()!
      const right = values.pop()!
      const left = values.pop()!
      values.push(applyOperator(left, right, op))
    }

    operators.push(currentOp)
    values.push(term.value)
  }

  // Resolve remaining operations
  while (operators.length > 0) {
    const op = operators.pop()!
    const right = values.pop()!
    const left = values.pop()!
    values.push(applyOperator(left, right, op))
  }

  return values[0]
}