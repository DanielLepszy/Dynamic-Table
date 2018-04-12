renderAgeLabel = (age) => {
    if (age === null || age === undefined || isNaN(age)) {
        return "";
    }
    return age;
}
renderAgeInYearLabel = (age) => {
    if (age === null || age === undefined || isNaN(age) || age <= 0) {
        return "";
    }
    return (age / 12).toFixed(2);
}
renderNameLabel = (dog) => {
    if (
        (dog === undefined) ||
        (dog === undefined || dog.name === undefined && dog.familyName === undefined) ||
        (dog.name === null && dog.familyName === null)
    ) {
        return ""
    }
    if (dog.name === undefined || dog.name === null) {
        return dog.familyName
    }
    if (dog.familyName === undefined || dog.familyName === null) {
        return dog.name
    }
    return dog.name + ' ' + dog.familyName
}
exports._test = {
    renderNameLabel: renderNameLabel,
    renderAgeLabel: renderAgeLabel,
    renderAgeInYearLabel: renderAgeInYearLabel
}