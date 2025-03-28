// declare module 'sonner' {
//   export interface ToastOptions {
//     duration?: number;
//     position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
//     className?: string;
//     style?: React.CSSProperties;
//   }

//   export interface Toast {
//     success: (message: string, options?: ToastOptions) => void;
//     error: (message: string, options?: ToastOptions) => void;
//     promise: <T>(
//       promise: Promise<T>,
//       messages: {
//         loading: string;
//         success: string;
//         error: string;
//       },
//       options?: ToastOptions
//     ) => Promise<T>;
//   }

//   const toast: Toast;
//   export default toast;
// } 