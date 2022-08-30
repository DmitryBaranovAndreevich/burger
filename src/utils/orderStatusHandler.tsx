
export const orderStatusHandleer = (status: string, styles: {statusDone?: string, statusPending?: string}) => {
  switch (status) {
    case "done":
      return(
        <p className={`${styles.statusDone} text text_type_main-default mt-2 mb-10`}>
          Выполнен
        </p>
      )

    case "created" :
      return(
        <p className={`text text_type_main-default  mt-2 mb-10`}> Готовиться </p>
      );

    case "pending":
      return(
        <p
          className={`${styles.statusPending} text text_type_main-default  mt-2 mb-10`}
        >
          В ожидании
        </p>
      );
  }
};
