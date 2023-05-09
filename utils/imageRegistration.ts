import React from 'react';
import firebase, { storage } from '../firebase/initFirebase';
import { TUser } from '@/types/user';

// 画像をfirebaseのstorageに保存
export const imageRegistration = () => {
  const onClickRegistration = (
    photoUrl: File | null,
    dbRegistration: (file: string | null) => void,
    setPhotoUrl: React.Dispatch<React.SetStateAction<File | null>>,
    setPreviewUrl: React.Dispatch<React.SetStateAction<string>>,
    user?: TUser
  ) => {
    if (photoUrl) {
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');
      const fileName = randomChar + '_' + photoUrl.name;

      const uploadImg = storage
        .ref(!user ? `userImages/${fileName}` : `coffeeImages/${user?.id}/${fileName}`)
        .put(photoUrl);

      uploadImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            .ref(!user ? 'userImages' : `coffeeImages/${user?.id}/`)
            .child(fileName)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              dbRegistration(fireBaseUrl);
            });
        }
      );
    } else {
      dbRegistration(null);
    }
    setPhotoUrl(null);
    setPreviewUrl('');
  };

  return { onClickRegistration };
};
