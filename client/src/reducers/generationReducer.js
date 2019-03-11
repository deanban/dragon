const DEFAULT_GENERATION = { generationId: '', expiration: '' };

const generationReducer = (state, action) => {
  if (action.type === 'GENERATION') {
    return { generation: action.payload };
  }
};

export default generationReducer;
