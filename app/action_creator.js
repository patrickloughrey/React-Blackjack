/* Helper methods that create actions instead of holding those actions in an object */
export function setUpGame() {
    return { "type": "SET_UP_GAME" };
}

export function setRecord(wins, losses) {
    return {
        "type": "SET_RECORD",
        wins,
        losses
    };
} 