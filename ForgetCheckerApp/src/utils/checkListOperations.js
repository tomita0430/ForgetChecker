export const addCheckListItem = (checklist, setChecklist) => {
    setChecklist([...checklist, { text: '', checked: false }]);
};

export const deleteCheckListItem = (indexToDelete, checklist, setChecklist) => {
    const newChecklist = checklist.filter((_, index) => index !== indexToDelete);
    setChecklist(newChecklist);
};

export const suggestChecklistItems = (noteName) => {
    switch (noteName.toLowerCase()) {
        case 'hiking':
            return [{ text: 'Water Bottle', checked: false }, { text: 'Backpack', checked: false }, { text: 'Snacks', checked: false }];
        case 'beach':
            return [{ text: 'Sunscreen', checked: false }, { text: 'Towel', checked: false }, { text: 'Swimwear', checked: false }];
        // ... 他のケース
        default:
            return [];
    }
};

