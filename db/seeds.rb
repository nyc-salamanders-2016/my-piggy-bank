# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Sam = Parent.create(name: "Sam", email:"sam@sam.com", password:"123456")
Sam_Jr = Child.create(name: "Sam Jr.", password: "123456", parent_id: 1, undeposited_funds: 3)
Samantha = Child.create(name: "Samantha.", password: "123456", parent_id: 1, undeposited_funds: 5)
Samantha_Investment = Investment.create(balance: 3, interest_rate: 2, child_id: 2 )
Sam_Jr_Investment = Investment.create(balance: 3, interest_rate: 2, child_id: 1 )
Samantha_Spending = Spending.create(balance: 5, child_id: 2)
Sam_Jr_Spending = Spending.create(balance: 5, child_id: 1)