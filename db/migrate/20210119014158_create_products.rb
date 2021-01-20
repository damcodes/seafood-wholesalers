class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :description
      t.float :price
      t.string :item_number

      t.timestamps
    end
  end
end
