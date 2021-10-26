type ButtonProps ={
    children?: string;
}

export function ButtonChildren(props: ButtonProps)
{
    return(<button>{props.children || 'Default'}</button>)
}

