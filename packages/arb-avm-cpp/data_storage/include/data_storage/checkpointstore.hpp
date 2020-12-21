/*
 * Copyright 2020, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef checkpointstore_hpp
#define checkpointstore_hpp

#include <avm_values/bigint.hpp>
#include <data_storage/checkpoint.hpp>
#include <data_storage/datastorage.hpp>
#include <data_storage/storageresultfwd.hpp>

#include <avm/machine.hpp>
#include <memory>
#include <vector>

namespace rocksdb {
class TransactionDB;
class Status;
struct Slice;
class ColumnFamilyHandle;
}  // namespace rocksdb

class CheckpointStore {
   private:
    std::shared_ptr<DataStorage> data_storage;

   public:
    CheckpointStore() = default;
    explicit CheckpointStore(std::shared_ptr<DataStorage> data_storage_)
        : data_storage(std::move(data_storage_)) {}
    void saveCheckpoint(const Checkpoint& checkpoint, Machine& machine);
    void saveAssertion(const Assertion& assertion);
    rocksdb::Status deleteCheckpoint(const uint256_t& height,
                                     const uint256_t& hash);
    DataResults getCheckpoint(const uint256_t& height,
                              const uint256_t& hash) const;

    std::vector<uint256_t> blockHashesAtHeight(const uint256_t& height) const;
    bool isEmpty() const;
    uint256_t maxHeight() const;
    uint256_t minHeight() const;
};

#endif /* checkpointstore_hpp */
