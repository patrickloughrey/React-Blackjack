/* Helper methods that create actions instead of holding those actions in an object */
export function setUpGame(seed=new Date().getTime()) {
    return { "type": "SET_UP_GAME", seed };
};

export function setRecord(wins, losses) {
    return {
        "type": "SET_RECORD",
        wins,
        losses
    };
} 

export function dealToPlayer(seed=new Date().getTime()) {
    return { "type": "DEAL_TO_PLAYER", seed };
}

export function stand(seed=new Date().getTime()) {
    return { "type": "STAND", seed };
};