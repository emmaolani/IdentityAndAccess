import EventStoreDelegate from "../../src/application/eventStoreDelegate";
import NewUserAccountCreated from "../../src/domain/model/userAccount/newUserAccountCreated";
import RepositoryFactoryMock from "./mock/repositoryFactoryMock";
import EventName from "../../src/domain/eventName";

describe("EventStoreDelegate", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const eventStore = repositoryFactory.getRepositories("EventStore");

  it("should be subscribed to All domain events", () => {
    const eventStoreSubscriber = new EventStoreDelegate(eventStore.EventStore);

    expect(eventStoreSubscriber.getSubscribedEventNames()).toEqual("ALL");
  });

  it("should delegate domain event to the event store", async () => {
    const eventStoreSubscriber = new EventStoreDelegate(eventStore.EventStore);

    await eventStoreSubscriber.handleEvent(
      new NewUserAccountCreated("userId", "userName")
    );

    const events = await eventStore.EventStore.getAllEventWithName(
      EventName.NewUserAccountCreated
    );

    expect(events[0]).toBeInstanceOf(NewUserAccountCreated);
  });
});
