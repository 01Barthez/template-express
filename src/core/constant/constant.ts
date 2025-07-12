

export const ONE_THOUSAND = 100 as const;

export const allowedExtensionsProfile: string[] = ['.jpg', '.png', '.jpeg', '.svg'];
export const allowMimeTypeProfile: string[] = ['image/jpeg', 'image/png'];

export const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;