/* tslint:disable:no-console */
import "dotenv/config";
import { IgApiClient, Feed } from "instagram-private-api/dist/";

const ig = new IgApiClient();

ig.state.generateDevice(process.env.IG_USERNAME as string);

(async () => {
  await ig.account.login(
    process.env.IG_USERNAME as string,
    process.env.IG_PASSWORD as string
  );

  const tagFeed = ig.feed.tags("löpning", "recent");
  const users = await getAllItemsFromFeed(tagFeed);
  console.log(users);
})();

/**
 * @param feed
 * @returns All items from the feed
 */

async function getAllItemsFromFeed<T>(feed: Feed<any, T>): Promise<T[]> {
  let items: any[] = [];
  do {
    items = items.concat(
      (await feed.items()).map((res) => (res as any).owner.username) as any
    );
  } while (feed.isMoreAvailable());
  return items;
}
