import ListItem from "./ListItem";

//creates getter for the list and also creates methods for the list

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void, //return void because you are doing something to document object model but you are not returning something from the function
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,

}

export default class FullList implements List {

    static instance: FullList = new FullList()
    //always able to refer to this as the instance of our class

    private constructor(private _list: ListItem[] = []){}
    //there will only be one instance of class created 

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if(typeof storedList !== "string") return 

        const parsedList: { _id: string, _item: string, _checked: boolean} [] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this.list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }

}