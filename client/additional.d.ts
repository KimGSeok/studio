interface Window {
  kakao: any;
}

declare module '@rmcooper/next-fullcalendar';
declare module '@rmcooper/next-fullcalendar/daygrid';
declare module '@rmcooper/next-fullcalendar/timegrid';
declare module '@rmcooper/next-fullcalendar/interaction';
declare module 'ramda';
declare module 'redux-promise';
declare global {
  type RootState = ReturnType<typeof reducer>;
}