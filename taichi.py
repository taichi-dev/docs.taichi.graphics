def field(dtype, shape=None):
    '''
    Scope: field
    Name: ti.field
    Since: v0.5.14
    Static: true

    Desc:
        Create a scalar field.

        ::: note
        When shape is not specified or `None`, it will allocates a sparse field.
        :::

    Args:
        dtype (ti.DataType): The data type of field elements
        shape (Optional[Union[int, tuple]]): The shape of field

    Returns:
        ti.ScalarField: The created scalar field
    '''
    return 233