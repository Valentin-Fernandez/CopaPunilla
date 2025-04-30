const Loading = ({ message = 'Cargando...' }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-terciary  rounded-xl shadow-md flex flex-col items-center p-12">
                <p className="text-primary font-bold">{message}</p>
            </div>
        </div>
    );
};

export default Loading;
