import React from 'react'

interface ButtonProps {
    onClick: () => void;
    label: string;
}

const Button:React.FC<ButtonProps> = ({onClick, label}) => {

    

  return (
    <button className="bg-blue-600 rounded-lg px-5 py-3" onClick={onClick}>
        {label}
    </button>
  )
}

export default Button