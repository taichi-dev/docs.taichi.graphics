import yaml
import inspect
from typing import *


def parseargs(doc: str) -> List[Dict[str, str]]:
    args = []
    lines = [line.strip() for line in doc.splitlines()]
    # We don't use `for line in lines:` here because we need to *peek*
    # the next `line[0]` without pop it:
    while lines:
        line = lines.pop(0)
        try:
            name, desc = line.split(':', 1)
        except ValueError:
            pass
        else:
            name = name.strip()
            desc = desc.strip()
            type = None
            if '(' in name:
                name, rest = name.split('(', 1)
                type, rest = rest.split(')', 1)
                name = name.strip()
            arg = {'name': name, 'desc': desc}
            if type is not None:
                arg['type'] = type
            args.append(arg)
    return args


def parsereturns(doc: str) -> List[Dict[str, str]]:
    rets = []
    lines = [line.strip() for line in doc.splitlines()]
    while lines:
        line = lines.pop(0)
        try:
            type, desc = line.split(':', 1)
        except ValueError:
            pass
        else:
            type = type.strip()
            desc = desc.strip()
            ret = {'type': type, 'desc': desc}
            rets.append(ret)
    return rets


def parse(doc: str) -> Dict[str, Any]:
    res = {}
    lines = [line.strip() for line in doc.splitlines()]
    while lines:
        line = lines.pop(0)
        try:
            key, value = line.split(':', 1)
        except ValueError:
            pass
        else:
            if key[0].isupper():  # is a valid taichi doc key, e.g. Scope, Args, Returns
                key = key.lower().strip()
                if not value:  # multiline value
                    values = []
                    while lines:
                        line = lines.pop(0)
                        try:
                            nextkey, nextvalue = line.split(':', 1)
                        except ValueError:
                            pass
                        else:
                            if nextkey[:1].isupper():  # is a valid taichi doc key
                                lines.insert(0, line)
                                break
                        values.append(line)
                    value = '\n'.join(values)
                value = value.strip()
                if value == 'true':
                    value = True
                elif value == 'false':
                    value = False
                res[key] = value
    return res


def dumpscope(module: Any, scope: str, desc: str) -> str:
    docs = {'desc': desc, 'functions': []}
    for k, v in module.__dict__.items():
        if k.startswith('_') and not (k.startswith('__') and k.endswith('__')):
            continue  # skip private functions
        if not hasattr(v, '__doc__') or v.__doc__ is None:
            continue  # doesn't have any doc :(
        doc = v.__doc__.strip()
        if not doc.startswith('Scope'):
            continue  # skip non-taichi docs

        doc_scope = doc[len('Scope:'):].splitlines()[0].strip()
        if scope and doc_scope != scope:
            continue  # not in the expected scope

        doc = parse(doc)
        if 'name' not in doc:
            doc['name'] = v.__name__

        if 'args' in doc:
            args = doc['args']
            del doc['args']
            doc['params'] = parseargs(args)
        if 'returns' in doc:
            doc['returns'] = parsereturns(doc['returns'])

        # TODO: support classes and variables too
        docs['functions'].append(doc)

    docs = {'title': scope, 'docs': docs}
    return '---\n' + yaml.dump(docs) + '---\n\n<ApiDocs/>\n'



def dumpdocs(module: Any, scopes: Dict[str, str]) -> Dict[str, str]:
    docs = {}
    for scope, desc in scopes.items():
        print(f'Dumping `{scope}`...')
        docs[scope] = dumpscope(module, scope, desc)
    return docs


if __name__ == '__main__':
    scopes = {
        'field': 'Scalar, vector, and matrix fields.',
        'matrix': 'Linear algebra (vectors and matrices).',
        'snode': 'Structural nodes (SNodes).',
        'arithmetics': 'Arithmetic operations.',
    }
    import taichi as ti

    path = 'website/docs/src/versioned_docs/develop/documentation/api'
    docs = dumpdocs(ti, scopes)
    for scope, doc in docs.items():
        with open(f'{path}/{scope}.md', 'w') as f:
            f.write(doc)
