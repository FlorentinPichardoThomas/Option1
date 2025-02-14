
interface ProjectsModalProps0 {
    isOpen: boolean;
    onClose: () => void;
  }

const ContactUs: React.FC<ProjectsModalProps0> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return(
<>
 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 max-w-3xl">
    <div className="cursor-pointer text-gray-800 hover:text-red-600 transition-colors"> support.example@gmail.com</div>
   
   
   <div className="cursor-pointer text-gray-800 hover:text-red-600 transition-colors">Youtube</div>
   
    
   <div className="cursor-pointer text-gray-800 hover:text-red-600 transition-colors">Instagram</div>
    
   
   <div className="cursor-pointer text-gray-800 hover:text-red-600 transition-colors">Facebook</div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
    </div>
    
 </div>
</>
    )
}

export default ContactUs;