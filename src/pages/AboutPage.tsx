export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto mt-8 text-center">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">
        About This Application
      </h1>
      <p className="text-text-secondary mb-6">
        Developed as an educational assignment transforming traditional class
        implementations to functional layouts.
      </p>

      <div className="border-t border-t-border pt-4 text-left mb-6">
        <h3 className="text-lg font-semibold mb-2">Author Information:</h3>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-secondary">
            🧑‍💻 Developer Name: Levan Sarishvili
          </p>
          <a
            href="https://github.com/levansarishvili"
            className="flex text-blue-700 gap-2 text-sm underline"
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-5" src="./assets/github.svg" />
            <span>Github Account</span>
          </a>
          <a
            href="https://www.linkedin.com/in/levan-sarishvili/"
            className="flex text-blue-700 gap-2 text-sm underline"
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-5" src="./assets/linkedin.svg" />
            <span>Linkedin Account</span>
          </a>
        </div>
      </div>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        RS School React Course Link
      </a>
    </div>
  );
}
