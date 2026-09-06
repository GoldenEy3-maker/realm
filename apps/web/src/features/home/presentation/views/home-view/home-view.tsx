import { helloUserName } from "@/core/i18n/messages";
import { Button } from "@/core/ui/button";
import { ProductCard } from "@/domains/product/presentation/ui/product-card";
import { SubComp } from "@/features/home/presentation/ui/sub-comp";

import styles from "./home-view.module.scss";

export function HomeView() {
  return (
    <div>
      <h1>HomeView</h1>
      <p>{helloUserName({ username: "123" })}</p>
      <Button className={styles.Button}>Test Button</Button>
      <SubComp className={styles.SubComp}>SubComp</SubComp>
      <ProductCard className={styles.ProductCard}>123</ProductCard>
    </div>
  );
}
