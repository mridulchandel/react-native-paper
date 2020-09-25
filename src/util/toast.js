import Toast from 'react-native-root-toast';

// Add a Toast on screen.
export const toast = (message, duration) => {
  return Toast.show(message, {
    duration: duration,
    position: -60,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
};

export const toastMsg = (isSuccess, msg, shortDuration) => {
  const duration = shortDuration ? Toast.durations.SHORT : Toast.durations.LONG;
  const toastMessage = isSuccess ? msg : 'Something Went Wrong!';
  console.log(toastMessage, 'toast');
  toast(toastMessage, duration);
};
