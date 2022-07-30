export const orderStatusHandleer = (status, styles) => {
  switch (status) {
    case "done":
      return (
        <p className={`${styles.statusDone} text text_type_main-default mt-2 mb-10`}>
          Выполнен
        </p>
      );

    case "created":
      return <p className={`text text_type_main-default `}>Готовиться</p>;

    case "pending":
      return (
        <p className={`${styles.statusPending} text text_type_main-default `}>
          Отменен
        </p>
      );
  }
}