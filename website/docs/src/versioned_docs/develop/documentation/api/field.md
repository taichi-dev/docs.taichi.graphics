---
docs:
  desc: Scalar, vector, and matrix fields.
  functions:
  - desc: 'Create a scalar field.


      ::: note

      When shape is not specified or `None`, it will allocates a sparse field.

      :::'
    name: ti.field
    params:
    - desc: The data type of field elements
      name: dtype
      type: ti.DataType
    - desc: The shape of field
      name: shape
      type: Optional[Union[int, tuple]]
    returns:
    - desc: The created scalar field
      type: ti.ScalarField
    scope: field
    since: v0.5.14
    static: true
title: field
---

<ApiDocs/>
