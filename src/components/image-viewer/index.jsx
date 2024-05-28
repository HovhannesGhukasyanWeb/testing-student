import { useState } from "react"
import PropTypes from 'prop-types';
import { X } from "lucide-react";


const ImageViewer = ({ imageSrc, children }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="flex justify-center items-center">
            {visible && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-gray-700/10 p-5">
                    <div className="flex justify-end">
                        <button onClick={() => setVisible(false)}>
                            <X className="w-8 h-8 text-white" />
                        </button>
                    </div>
                    <div>
                        <img src={imageSrc} alt="image" className="w-full h-full object-contain" />
                    </div>
                </div>
            )}
            <button className="flex justify-center items-center" >
                {children}
            </button>
        </div>
    )
}

ImageViewer.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default ImageViewer;