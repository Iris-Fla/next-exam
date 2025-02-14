export function subjectBackgroundClass(subject: string) {
  switch (subject) {
    case "物理":
      return "bg-physics-gradient";
    case "化学":
      return "bg-chemistry-gradient";
    case "生物":
      return "bg-biology-gradient";
    case "衛生":
      return "bg-hygiene-gradient";
    case "薬理":
      return "bg-pharmacology-gradient";
    case "薬剤":
      return "bg-pharmacy-gradient";
    case "病態,薬物":
      return "bg-pathology-pharmacotherapy-gradient";
    case "法規,制度":
      return "bg-legal-system-gradient";
    case "倫理":
      return "bg-ethics-gradient";
    case "実習":
      return "bg-practice-gradient";
    default:
      return "bg-white";
  }
}
