package umm3601.todo;

import com.google.gson.Gson;

import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.Comparator;

/**
 * A fake "database" of todo info

 */
public class TodoDatabase {

  private Todo[] allTodos;

  public TodoDatabase(String todoDataFile) throws IOException {
    Gson gson = new Gson();
    FileReader reader = new FileReader(todoDataFile);
    allTodos = gson.fromJson(reader, Todo[].class);
  }

  // Get todo by specific ID
  public Todo getTodo(String id) {
    return Arrays.stream(allTodos).filter(x -> x._id.equals(id)).findFirst().orElse(null);
  }

/**
 *  first attempt by using lambda to filter the owner, couldn't achieve it.
  public Todo[] getTodosByOwner(String owner) {
    Todo[] todosOwner;
    todosOwner = Arrays.stream(allTodos).filter(x -> x.owner.equals(owner)).toArray(Todo[]::new);
    return todosOwner;

  }
*/

  // Filter that filters the list of todos by query parameters.
  public Todo[] listTodos(Map<String, String[]> queryParams) {
    Todo[] returnedTodos = null;


    // Filter by owner
    if(queryParams.containsKey("owner")) {
      returnedTodos = Arrays.stream(allTodos).filter(x -> x.owner.equalsIgnoreCase(queryParams.get("owner")[0])).toArray(Todo[]::new);
      return returnedTodos;
    }
    // Filter by category
    if(queryParams.containsKey("category")) {
      returnedTodos = Arrays.stream(allTodos).filter(x -> x.category.equalsIgnoreCase(queryParams.get("category")[0])).toArray(Todo[]::new);
      return returnedTodos;
    }
    // Set up limit terms for return Todos
    if(queryParams.containsKey("limit")) {
      int limit = Integer.parseInt(queryParams.get("limit")[0]);
      Todo[] tempTodos = new Todo[limit];
      for(int i = 0; i < limit && i < allTodos.length; i++) {
        tempTodos[i] = allTodos[i];
        returnedTodos = tempTodos;
      }
      return returnedTodos;
    }
    // Filter by status
    if(queryParams.containsKey("status")) {
      String status = queryParams.get("status")[0];

      if(status.equals("complete")) {
        returnedTodos = Arrays.stream(allTodos).filter(x -> x.status == true).toArray(Todo[]::new);
      }
      if(status.equals("incomplete")) {
        returnedTodos = Arrays.stream(allTodos).filter(x -> x.status == false).toArray(Todo[]::new);
      }
      return returnedTodos;
    }
    // Filter todos by what their body contains
    if(queryParams.containsKey("contains")) {
      returnedTodos = Arrays.stream(allTodos).filter(x -> x.body.contains(queryParams.get("contains")[0])).toArray(Todo[]::new);
      return returnedTodos;
    }
    // Sort specific Todos alphabetically
    if(queryParams.containsKey("orderBy")) {
      String type = queryParams.get("orderBy")[0];
      if(type.equals("owner")) {
        returnedTodos = Arrays.stream(allTodos).sorted(Comparator.comparing(x -> x.owner)).toArray(Todo[]::new);
      }else if (type.equals("category")) {
        returnedTodos = Arrays.stream(allTodos).sorted(Comparator.comparing(x -> x.category)).toArray(Todo[]::new);
      }else if (type.equals("status")) {
        returnedTodos = Arrays.stream(allTodos).sorted(Comparator.comparing(x -> x.status)).toArray(Todo[]::new);
      }else if (type.equals("body")) {
        returnedTodos = Arrays.stream(allTodos).sorted(Comparator.comparing(x -> x.body)).toArray(Todo[]::new);
      }
      return returnedTodos;
    }

    return allTodos;

  }

}
