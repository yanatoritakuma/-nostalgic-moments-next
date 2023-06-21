import React, { useContext } from 'react';
import firebase, { storage } from '../firebase/initFirebase';
import { TUser } from '@/types/user';
import { BackdropContext } from '@/provider/BackdropProvider';

// 画像をfirebaseのstorageに保存
export const imageRegistration = () => {
  const { setBackdropFlag } = useContext(BackdropContext);

  const onClickRegistration = (
    photoUrl: File | null,
    setPhotoUrl: React.Dispatch<React.SetStateAction<File | null>>,
    setPreviewUrl: React.Dispatch<React.SetStateAction<string>>,
    dbRegistration?: (file: string | null) => void,
    user?: TUser
  ) => {
    setBackdropFlag(true);
    if (photoUrl) {
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');
      const fileName = randomChar + '_' + photoUrl.name;

      const uploadImg = storage
        .ref(!user ? `userImages/${fileName}` : `postImages/${user?.id}/${fileName}`)
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
            .ref(!user ? 'userImages' : `postImages/${user?.id}/`)
            .child(fileName)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              if (dbRegistration) {
                dbRegistration(fireBaseUrl);
              }
            });
        }
      );
    } else {
      if (dbRegistration) {
        dbRegistration(null);
      }
    }
    setPhotoUrl(null);
    setPreviewUrl('');
  };

  return { onClickRegistration };
};
