// src/pages/About.tsx
export default function About() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8 max-w-2xl mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        About This Application
      </h1>
      <p className="text-gray-600 mb-6">
        Developed as an educational assignment transforming traditional class
        implementations to functional layouts.
      </p>

      <div className="border-t pt-4 text-left mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Author Information:
        </h3>
        <p className="text-sm text-gray-600">
          🧑‍💻 Developer Name: RS School Student
        </p>
        <p className="text-sm text-gray-600">
          🌐 Github Identity: @your-github-username
        </p>
      </div>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        RS School React Course Link
      </a>
    </div>
  );
}
