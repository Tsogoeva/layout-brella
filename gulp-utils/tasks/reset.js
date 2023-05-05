import { deleteAsync } from 'del';

export default () => deleteAsync(['dist']);
