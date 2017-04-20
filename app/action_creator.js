/* Helper methods that create actions instead of holding those actions in an object */
export setUpGame() => {
    return { "type": "SET_UP_GAME" };
}

export setRecord() => {
    return {
        "type": "SET_RECORD",
        wins,
        losses
    };
} 