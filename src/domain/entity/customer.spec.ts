import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            let customer = new Customer("", "Rafael");
        }).toThrowError("Id is required");
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it('should change name', () => {
        // Arrange
        const customer = new Customer("123", "Rafael");
        
        //Act
        customer.changeName("Teste");
        
        //Assert
        expect(customer.name).toBe("Teste");
    });

    it('should activate customer', () => {
        const customer = new Customer("1", "customer 1");
        const address = new Address("Rua Teste", 150, "88000-000", "Tubarão");
        customer.Address = address;

        customer.activate();
        
        expect(customer.isActive()).toBe(true);
    });

    it('should throw error when address is undefined when you activate a customer', () => {
        
        expect(() => {
            const customer = new Customer("1", "customer 1");
            customer.activate();

        }).toThrowError("Address is mandatory to activate a customer");
    });

    it('should deactivate customer', () => {
        const customer = new Customer("1", "customer 1");
        customer.deactivate();
        
        expect(customer.isActive()).toBe(false);
    });

    it("should add reawrd points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);

    }); 

});