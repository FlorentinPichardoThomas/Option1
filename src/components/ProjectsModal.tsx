import { useState } from "react";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const projects = [
    {
      title: "Modern Eco Garden",
      description: "A sustainable garden with drought-resistant plants.",
      img: "https://images.pexels.com/photos/17893477/pexels-photo-17893477/free-photo-of-solar-energy.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Urban Green Space",
      description: "A rooftop garden providing a refreshing escape in the city for all the buildings residents and guest.",
      img: "https://images.pexels.com/photos/8431154/pexels-photo-8431154.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Smart Irrigation System",
      description: "Incan inspired Automated watering system for efficient water usage.",
      img: "https://images.pexels.com/photos/26068719/pexels-photo-26068719/free-photo-of-rice-fields-in-countryside.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="p-3 border rounded-lg shadow-sm">
              <img src={project.img} alt={project.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProjectsModal;
