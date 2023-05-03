---
title: Grounding
---

Unlike in most other languages, Eclair doesn't have explicit initialization of
variables. Variables just "appear" in the body of a rule and can be used
immediately. Even when you are "assigning" a value to a variable, you are
actually telling the compiler to unify both sides of an equation.

In order to make sure that variables can always be properly initialized
with values at runtime, Eclair has the concept of _grounding_. When a variable
is grounded, it means that a variable can be allocated in memory, and is
assigned a value to it before it is ever used.

## Rules

Below are all the grounding rules that Eclair checks against. These rules are
checked indepedently for each rule or fact in a program. All variables must be
grounded in all rules for a program to be semantically valid. If this is not the
case, the compiler will abort with an error.

1. No variables are allowed in top level facts (this is only allowed in Prolog);
2. Literal values (numbers and strings) are always grounded;
3. A binary operator (such as `+`) produces a grounded value if both left hand
   side and right hand side of the operator are also grounded;
4. Comparison and inequality operators (such as `<`) do not ground their arguments;
5. A variable is grounded if it used as an argument in a rule clause (but this is
   only the case when it is not used inside a negated rule clause);
6. A variable is grounded if a literal is assigned to it;
7. A variable is grounded if another grounded variable is assigned to it;
8. All occurrences of a variable with the same name in a rule are grounded once
   one of them is grounded;
9. A [user-defined function or constraint](/docs/user-defined-functions) does not
   ground any of it's arguments. The return value of a user-defined function is
   grounded if all of it's arguments are grounded.

Note that these rules are recursive, meaning that the grounding property spreads
throughout the body of a rule.
