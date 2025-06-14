import { BsStars } from "react-icons/bs";

export default function PhysicianNotesTab({ physicianNotes }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-8">Physician Notes</h2>

        <div className="space-y-8">
          {physicianNotes?.map((note, index) => (
            <div key={index} className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{note.title}</h3>
                <div className="text-gray-400 text-sm mb-4">{note.date}</div>
                <p className="text-gray-300 mb-4 leading-relaxed">{note.content}</p>

                {note?.aiKeyPoints && (
                  <div className="bg-teal-900 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <BsStars className="text-yellow-500" />
                      <span className="text-gray-300 font-semibold">AI Key Points:</span>
                    </div>
                    <ul className="space-y-2">
                      {note.aiKeyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-gray-100 text-sm">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
