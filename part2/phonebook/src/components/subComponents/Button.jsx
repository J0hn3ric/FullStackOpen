const Button = ({type, text, onClick}) =>{
    return(<div>
        <button type={type} onClick={onClick}>{text}</button>
      </div>)
}

export default Button