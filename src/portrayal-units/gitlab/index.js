import { Gitlab } from '@gitbeaker/node';

export default ({ host = '', token = '' } = {}) => {
  return new Gitlab({
    host: 'https://gitlab.enncloud.cn',
    token: 'glpat-eX8szMcGsuYh8xwCmswX'
  });
}
