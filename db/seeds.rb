require 'date'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Sam = Parent.create(name: "Sam", username: "sam", email:"sam@sam.com", password:"123456")
Sam_Jr = Child.create(name: "Sam Jr.", username: "boyjr", password: "123456", parent_id: 1, undeposited_funds: 3)

Samantha = Child.create(name: "Samantha", username: "girljr", password: "123456", parent_id: 1, undeposited_funds: 5)

Samantha_Investment = Investment.create(balance: 3, start_date: Date.parse('2016-09-05'), interest_rate: 2, child_id: 2 )

Samantha_Spending = Spending.create(balance: 5, child_id: 2)
Samantha_Donation = Donation.create(balance: 5, child_id: 2)
Samantha_Saving = Saving.create(balance: 5, child_id: 2, save_item: "barbie dream house")

Sam_Jr_Investment = Investment.create(balance: 3, start_date: Date.parse('2015-09-05'), interest_rate: 2, child_id: 1 )
Sam_Jr_Spending = Spending.create(balance: 5, child_id: 1)
Sam_Jr_Donation = Donation.create(balance: 5, child_id: 1)
Sam_Jr_Saving = Saving.create(balance: 5, child_id: 1, save_item: "bicycle")

More_Money = Notification.create( text: "I RAN OUT OF MONEY :[", child_id: 1)
Less_Money = Notification.create(text:"stop giving me money, i have enough", child_id: 2)

rewards = [
  {child_id: 1, amount: 3, item: "stay up 30 min past bedtime"},
  {child_id: 2, amount: 4, item: "ice cream cone after dinner"},
  {child_id: 1, amount: 2, item: "extra tv time"},
  {child_id: 2, amount: 2, item: "extra tv time"}
]

Reward.create(rewards)
