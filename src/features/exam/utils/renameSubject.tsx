export function renameSubject(subject: string) {
    switch (subject) {
        case "physics":
            return "物理";
        case "chemistry":
            return "化学";
        case "biology":
            return "生物";
        case "hygiene":
            return "衛生";
        case "pharmacology":
            return "薬理";
        case "pharmacy":
            return "薬剤";
        case "pathology":
            return "病態,薬物";
        case "legal":
            return "法規,制度";
        case "ethics":
            return "倫理";
        case "practice":
            return "実習";
        default:
            return "その他";
    }
}