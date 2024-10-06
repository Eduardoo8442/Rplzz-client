export default function EmailSendComponent({type, message}: {type: any, message: any}) {
    return(
        <div>
            {type ? (
                <div className="bg-red-600 p-2 geist rounded text-white flex items-center justify-center">
                     <p>{message}</p>
                </div>
            ) : (
                <div className="bg-green-600 p-2 rounded geist text-white flex items-center justify-center">
                     <p>{message}</p>
                </div>
            )}
        </div>
    )
} 