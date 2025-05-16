const Button = ({ label, onClick, color, textColor, border, full, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={border ? `${textColor} ${border} rounded-md text-base p-2 shadow-md ${full}` : `${color} ${textColor} rounded-md text-base p-3 shadow-md ${full}`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
