const trainingRoute = '/training';

export const routeConstants = {
  default: '/',
  training: {
    list: `${trainingRoute}/list`,
    edit: `${trainingRoute}/edit`,
    editWithParams: `${trainingRoute}/edit/:id`,
  },
};
