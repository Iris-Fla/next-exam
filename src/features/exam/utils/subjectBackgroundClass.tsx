export function subjectBackgroundClass(subject: string) {
  switch (subject) {
    case "physics":
      return "bg-gradient-to-r from-blue-400 via-blue-200 to-blue-100";
    case "chemistry":
      return "bg-gradient-to-r from-yellow-300 via-yellow-100 to-white";
    case "biology":
      return "bg-gradient-to-r from-green-400 via-green-200 to-green-100";
    case "hygiene":
      return "bg-gradient-to-r from-pink-300 via-pink-100 to-white";
    case "pharmacology":
      return "bg-gradient-to-r from-purple-400 via-purple-200 to-purple-100";
    case "pharmacy":
      return "bg-gradient-to-r from-orange-400 via-orange-200 to-orange-100";
    case "pathology":
      return "bg-gradient-to-r from-red-400 via-red-200 to-red-100";
    case "legal":
      return "bg-gradient-to-r from-gray-400 via-gray-200 to-gray-100";
    case "ethics":
      return "bg-gradient-to-r from-indigo-400 via-indigo-200 to-indigo-100";
    case "practice":
      return "bg-gradient-to-r from-teal-400 via-teal-200 to-teal-100";
    default:
      return "bg-gradient-to-r from-white to-gray-100";
  }
}
