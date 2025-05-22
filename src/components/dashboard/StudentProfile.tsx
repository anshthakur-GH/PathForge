import { useState } from 'react';

interface StudentData {
  name: string;
  age: number;
  avatar: string; // can be base64 or url
  interests: string[];
}

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState<StudentData>({
    name: "Alex Johnson",
    age: 20,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    interests: ["Web Development", "AI/ML", "Mobile Apps", "UI/UX Design"]
  });
  const [editForm, setEditForm] = useState({
    name: studentData.name,
    age: studentData.age,
    avatar: studentData.avatar
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setEditForm(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentData(prev => ({
      ...prev,
      name: editForm.name,
      age: editForm.age,
      avatar: editForm.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${editForm.name}`
    }));
    setIsEditing(false);
    setPreview(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <img
            src={isEditing ? (preview || editForm.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${editForm.name}`) : (studentData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentData.name}`)}
            alt={`${studentData.name}'s avatar`}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-indigo-100 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={editForm.age}
                  onChange={(e) => setEditForm(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-20 h-20 rounded-full object-cover border-2 border-indigo-200 mx-auto md:mx-0"
                  />
                )}
              </div>
              <div className="flex gap-2 justify-center md:justify-start">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({ name: studentData.name, age: studentData.age, avatar: studentData.avatar });
                    setPreview(null);
                  }}
                  className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {studentData.name}
              </h1>
              <p className="text-gray-600">Age: {studentData.age}</p>
              {/* Interests */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Interested in:</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {studentData.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Edit Button */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentProfile; 