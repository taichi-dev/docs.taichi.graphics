'''
A dummy `taichi` module to test the API dumper functionality :)
'''


def field(dtype, shape=None):
    '''
    Scope: field
    Name: ti.field
    Since: v0.5.14
    Static: true

    Desc:
        Create a scalar field.

        ::: note
        When `shape` is `None` (or unspecified), its layout needs to be specified later using advanced data layouts.
        :::

    Args:
        dtype (ti.DataType): The data type of field elements
        shape (Optional[Union[int, tuple]]): The shape of field

    Returns:
        ti.ScalarField: The created scalar field
    '''
    return 233
